<?php
/**
 * Plugin Name: FreeBirds VPN Quiz Leads
 * Plugin URI:  https://freebirdsdigest.com
 * Description: Captures and displays VPN recommendation quiz leads from the Next.js frontend directly in WordPress Admin. Includes a dedicated admin dashboard, lead detail view, and CSV export.
 * Version:     1.0.0
 * Author:      FreeBirds Digest
 * Text Domain: freebirds-vpn-leads
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Secret key for securing the REST API endpoint. Can be overridden in wp-config.php:
// define('FREEBIRDS_VPN_LEAD_SECRET', 'your-custom-secret-here');
if (!defined('FREEBIRDS_VPN_LEAD_SECRET')) {
    define('FREEBIRDS_VPN_LEAD_SECRET', 'freebirds_vpn_lead_secret_2026');
}

/**
 * 1. Register Custom Post Type: vpn_lead
 */
function freebirds_register_vpn_lead_cpt() {
    $labels = array(
        'name'               => 'VPN Leads',
        'singular_name'      => 'VPN Lead',
        'menu_name'          => 'VPN Leads',
        'name_admin_bar'     => 'VPN Lead',
        'add_new'            => 'Add New Lead',
        'add_new_item'       => 'Add New VPN Lead',
        'new_item'           => 'New VPN Lead',
        'edit_item'          => 'View VPN Lead',
        'view_item'          => 'View VPN Lead',
        'all_items'          => 'All VPN Leads',
        'search_items'       => 'Search VPN Leads',
        'not_found'          => 'No VPN leads found.',
        'not_found_in_trash' => 'No VPN leads found in Trash.'
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => false,
        'rewrite'            => false,
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 26,
        'menu_icon'          => 'dashicons-shield',
        'supports'           => array('title'),
        'show_in_rest'       => false
    );

    register_post_type('vpn_lead', $args);
}
add_action('init', 'freebirds_register_vpn_lead_cpt');

/**
 * 2. Custom Columns in Admin List Table
 */
function freebirds_vpn_lead_columns($columns) {
    $new_columns = array(
        'cb'            => $columns['cb'],
        'title'         => 'Lead / Match',
        'location'      => 'Location (Vercel Edge)',
        'ip_address'    => 'IP Address',
        'top_match'     => '🥇 Top Recommendation',
        'runner_up'     => '🥈 Runner-Up',
        'date'          => 'Date & Time'
    );
    return $new_columns;
}
add_filter('manage_vpn_lead_posts_columns', 'freebirds_vpn_lead_columns');

function freebirds_vpn_lead_custom_column($column, $post_id) {
    switch ($column) {
        case 'location':
            $city = get_post_meta($post_id, '_lead_city', true);
            $country = get_post_meta($post_id, '_lead_country', true);
            $region = get_post_meta($post_id, '_lead_region', true);
            
            $loc_str = '';
            if (!empty($city)) $loc_str .= esc_html($city);
            if (!empty($region)) $loc_str .= (!empty($loc_str) ? ', ' : '') . esc_html($region);
            if (!empty($country)) $loc_str .= (!empty($loc_str) ? ' ' : '') . '<span style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 11px;">' . esc_html($country) . '</span>';
            
            echo !empty($loc_str) ? $loc_str : '<span style="color:#94a3b8;">Local / Unknown</span>';
            break;

        case 'ip_address':
            $ip = get_post_meta($post_id, '_lead_ip', true);
            echo !empty($ip) ? '<code style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-size:12px;">' . esc_html($ip) . '</code>' : '—';
            break;

        case 'top_match':
            $name = get_post_meta($post_id, '_lead_top_match', true);
            $score = get_post_meta($post_id, '_lead_top_score', true);
            $price = get_post_meta($post_id, '_lead_top_price', true);
            if (!empty($name)) {
                echo '<span style="background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block;">' . esc_html($name) . ($score ? ' (' . esc_html($score) . '%)' : '') . '</span>';
                if (!empty($price)) {
                    echo '<br/><span style="font-size: 11px; color: #64748b; font-weight: 600;">' . esc_html($price) . '</span>';
                }
            } else {
                echo '—';
            }
            break;

        case 'runner_up':
            $name = get_post_meta($post_id, '_lead_runner_up', true);
            $price = get_post_meta($post_id, '_lead_runner_price', true);
            if (!empty($name)) {
                echo '<strong style="color: #334155; font-size: 12px;">' . esc_html($name) . '</strong>';
                if (!empty($price)) {
                    echo '<br/><span style="font-size: 11px; color: #64748b;">' . esc_html($price) . '</span>';
                }
            } else {
                echo '—';
            }
            break;
    }
}
add_action('manage_vpn_lead_posts_custom_column', 'freebirds_vpn_lead_custom_column', 10, 2);

/**
 * 3. Add "Export to CSV" button in the Admin Table view
 */
function freebirds_vpn_leads_export_button() {
    global $typenow;
    if ($typenow === 'vpn_lead') {
        $export_url = wp_nonce_url(admin_url('admin-post.php?action=export_vpn_leads'), 'freebirds_export_vpn_leads');
        ?>
        <div style="float: right; margin-bottom: 8px;">
            <a href="<?php echo esc_url($export_url); ?>" class="button button-primary" style="display: inline-flex; align-items: center; gap: 4px;">
                <span class="dashicons dashicons-download" style="margin-top: 3px;"></span> Export All Leads to CSV
            </a>
        </div>
        <?php
    }
}
add_action('manage_posts_extra_tablenav', 'freebirds_vpn_leads_export_button');

/**
 * 4. Handle CSV Export
 */
function freebirds_handle_vpn_leads_export() {
    if (!current_user_can('manage_options')) {
        wp_die('Unauthorized user.');
    }
    check_admin_referer('freebirds_export_vpn_leads');

    $args = array(
        'post_type'      => 'vpn_lead',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'orderby'        => 'date',
        'order'          => 'DESC'
    );
    $query = new WP_Query($args);

    $filename = 'vpn_quiz_leads_' . gmdate('Y-m-d_His') . '.csv';

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Pragma: no-cache');
    header('Expires: 0');

    $output = fopen('php://output', 'w');

    // CSV Column Headers
    fputcsv($output, array(
        'Lead ID',
        'Date & Time (UTC)',
        'IP Address',
        'Country',
        'City',
        'Region',
        'Timezone',
        'Coordinates',
        'Top Recommendation',
        'Top Fit Score (%)',
        'Top Price',
        'Runner-Up',
        'Runner-Up Price',
        'Q1: Use Cases',
        'Q2: Device Count',
        'Q3: Budget Tier',
        'Q4: Security Features',
        'Q5: App Interface',
        'User Agent'
    ));

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();

            fputcsv($output, array(
                $post_id,
                get_the_date('Y-m-d H:i:s'),
                get_post_meta($post_id, '_lead_ip', true),
                get_post_meta($post_id, '_lead_country', true),
                get_post_meta($post_id, '_lead_city', true),
                get_post_meta($post_id, '_lead_region', true),
                get_post_meta($post_id, '_lead_timezone', true),
                get_post_meta($post_id, '_lead_coordinates', true),
                get_post_meta($post_id, '_lead_top_match', true),
                get_post_meta($post_id, '_lead_top_score', true),
                get_post_meta($post_id, '_lead_top_price', true),
                get_post_meta($post_id, '_lead_runner_up', true),
                get_post_meta($post_id, '_lead_runner_price', true),
                get_post_meta($post_id, '_lead_q1', true),
                get_post_meta($post_id, '_lead_q2', true),
                get_post_meta($post_id, '_lead_q3', true),
                get_post_meta($post_id, '_lead_q4', true),
                get_post_meta($post_id, '_lead_q5', true),
                get_post_meta($post_id, '_lead_user_agent', true),
            ));
        }
        wp_reset_postdata();
    }

    fclose($output);
    exit;
}
add_action('admin_post_export_vpn_leads', 'freebirds_handle_vpn_leads_export');

/**
 * 5. Detail Meta Box for Single Lead View
 */
function freebirds_add_vpn_lead_metaboxes() {
    add_meta_box(
        'freebirds_vpn_lead_card',
        '🎯 VPN Quiz Lead & Recommendations Details',
        'freebirds_render_vpn_lead_card',
        'vpn_lead',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'freebirds_add_vpn_lead_metaboxes');

function freebirds_render_vpn_lead_card($post) {
    $post_id = $post->ID;

    $ip          = get_post_meta($post_id, '_lead_ip', true);
    $country     = get_post_meta($post_id, '_lead_country', true);
    $city        = get_post_meta($post_id, '_lead_city', true);
    $region      = get_post_meta($post_id, '_lead_region', true);
    $timezone    = get_post_meta($post_id, '_lead_timezone', true);
    $coordinates = get_post_meta($post_id, '_lead_coordinates', true);
    $user_agent  = get_post_meta($post_id, '_lead_user_agent', true);

    $top_match   = get_post_meta($post_id, '_lead_top_match', true);
    $top_score   = get_post_meta($post_id, '_lead_top_score', true);
    $top_price   = get_post_meta($post_id, '_lead_top_price', true);
    $top_reasons = get_post_meta($post_id, '_lead_top_reasons', true);

    $runner_up   = get_post_meta($post_id, '_lead_runner_up', true);
    $runner_score= get_post_meta($post_id, '_lead_runner_score', true);
    $runner_price= get_post_meta($post_id, '_lead_runner_price', true);

    $q1 = get_post_meta($post_id, '_lead_q1', true);
    $q2 = get_post_meta($post_id, '_lead_q2', true);
    $q3 = get_post_meta($post_id, '_lead_q3', true);
    $q4 = get_post_meta($post_id, '_lead_q4', true);
    $q5 = get_post_meta($post_id, '_lead_q5', true);

    $reasons_arr = !empty($top_reasons) ? explode('||', $top_reasons) : array();
    ?>
    <style>
        .fb-lead-wrapper { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .fb-lead-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
        @media (max-width: 768px) { .fb-lead-grid { grid-template-columns: 1fr; } }
        .fb-lead-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
        .fb-lead-box h3 { margin-top: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
        .fb-lead-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed #f1f5f9; font-size: 13px; }
        .fb-lead-row:last-child { border-bottom: none; }
        .fb-lead-label { color: #64748b; font-weight: 600; }
        .fb-lead-val { color: #0f172a; font-weight: 700; text-align: right; }
        .fb-winner-card { background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
        .fb-winner-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .fb-winner-badge { background: #2563eb; color: #fff; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; }
        .fb-winner-title { font-size: 18px; font-weight: 800; color: #1e3a8a; }
        .fb-runner-card { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 16px; }
        .fb-question-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px; }
        .fb-question-card h4 { margin: 0 0 6px 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; }
        .fb-question-card .fb-q-val { font-size: 13px; font-weight: 600; color: #0f172a; }
    </style>

    <div class="fb-lead-wrapper">
        <div class="fb-lead-grid">
            <!-- Left: Visitor Telemetry -->
            <div class="fb-lead-box">
                <h3>📍 Visitor Telemetry (Vercel Edge)</h3>
                <div class="fb-lead-row">
                    <span class="fb-lead-label">IP Address:</span>
                    <span class="fb-lead-val"><code style="background:#fff; border:1px solid #cbd5e1; padding:2px 6px; border-radius:4px;"><?php echo esc_html($ip ?: 'Localhost'); ?></code></span>
                </div>
                <div class="fb-lead-row">
                    <span class="fb-lead-label">Location:</span>
                    <span class="fb-lead-val">
                        <?php 
                        $loc_full = array_filter(array($city, $region, $country));
                        echo !empty($loc_full) ? esc_html(implode(', ', $loc_full)) : 'Development / Local';
                        ?>
                    </span>
                </div>
                <?php if (!empty($coordinates)): ?>
                <div class="fb-lead-row">
                    <span class="fb-lead-label">Coordinates:</span>
                    <span class="fb-lead-val">
                        <?php echo esc_html($coordinates); ?>
                        <a href="https://www.google.com/maps?q=<?php echo urlencode($coordinates); ?>" target="_blank" style="margin-left: 4px; font-size: 11px;">View Map ↗</a>
                    </span>
                </div>
                <?php endif; ?>
                <div class="fb-lead-row">
                    <span class="fb-lead-label">Timezone:</span>
                    <span class="fb-lead-val"><?php echo esc_html($timezone ?: 'UTC'); ?></span>
                </div>
                <div class="fb-lead-row">
                    <span class="fb-lead-label">Date Generated:</span>
                    <span class="fb-lead-val"><?php echo get_the_date('M j, Y g:i a', $post_id); ?></span>
                </div>
                <div class="fb-lead-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                    <span class="fb-lead-label">Device / User Agent:</span>
                    <span class="fb-lead-val" style="text-align: left; font-size: 11px; font-weight: normal; color: #64748b; word-break: break-all;">
                        <?php echo esc_html($user_agent ?: 'Unknown'); ?>
                    </span>
                </div>
            </div>

            <!-- Right: Recommended VPNs -->
            <div>
                <div class="fb-winner-card">
                    <div class="fb-winner-header">
                        <span class="fb-winner-badge">🥇 #1 Best Match (<?php echo esc_html($top_score ?: '95'); ?>%)</span>
                        <strong style="color: #2563eb; font-size: 14px;"><?php echo esc_html($top_price); ?></strong>
                    </div>
                    <div class="fb-winner-title"><?php echo esc_html($top_match); ?></div>
                    <?php if (!empty($reasons_arr)): ?>
                    <ul style="margin: 8px 0 0 16px; padding: 0; font-size: 12px; color: #334155;">
                        <?php foreach ($reasons_arr as $r): ?>
                            <li style="margin-bottom: 4px;"><?php echo esc_html(trim($r)); ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <?php endif; ?>
                </div>

                <?php if (!empty($runner_up)): ?>
                <div class="fb-runner-card">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">
                        🥈 Runner-Up (<?php echo esc_html($runner_score ?: '88'); ?>% Match)
                    </div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">
                        <?php echo esc_html($runner_up); ?>
                        <span style="font-size: 12px; font-weight: 600; color: #64748b; margin-left: 6px;"><?php echo esc_html($runner_price); ?></span>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- User Answers Breakdown -->
        <h3 style="margin: 20px 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
            📋 Exact User Quiz Selections (Q1 - Q5)
        </h3>

        <div class="fb-question-card">
            <h4>Q1: Primary Use Case(s)</h4>
            <div class="fb-q-val"><?php echo nl2br(esc_html($q1 ?: 'None selected')); ?></div>
        </div>

        <div class="fb-question-card">
            <h4>Q2: Device Count</h4>
            <div class="fb-q-val"><?php echo esc_html($q2 ?: 'Not answered'); ?></div>
        </div>

        <div class="fb-question-card">
            <h4>Q3: Budget & Subscription Tier</h4>
            <div class="fb-q-val"><?php echo esc_html($q3 ?: 'Not answered'); ?></div>
        </div>

        <div class="fb-question-card">
            <h4>Q4: Privacy & Security Requirements</h4>
            <div class="fb-q-val"><?php echo nl2br(esc_html($q4 ?: 'None selected')); ?></div>
        </div>

        <div class="fb-question-card">
            <h4>Q5: App Interface Preference</h4>
            <div class="fb-q-val"><?php echo esc_html($q5 ?: 'Not answered'); ?></div>
        </div>
    </div>
    <?php
}

/**
 * 6. REST API Endpoint: POST /wp-json/freebirds/v1/vpn-lead
 */
function freebirds_register_lead_api_routes() {
    register_rest_route('freebirds/v1', '/vpn-lead', array(
        'methods'             => 'POST',
        'callback'            => 'freebirds_api_record_vpn_lead',
        'permission_callback' => 'freebirds_api_verify_permission'
    ));
}
add_action('rest_api_init', 'freebirds_register_lead_api_routes');

function freebirds_api_verify_permission($request) {
    // 1. Check secret header
    $auth_header = $request->get_header('x-vpn-lead-secret');
    if ($auth_header && hash_equals(FREEBIRDS_VPN_LEAD_SECRET, $auth_header)) {
        return true;
    }

    // 2. Check query parameter fallback
    $param_secret = $request->get_param('secret');
    if ($param_secret && hash_equals(FREEBIRDS_VPN_LEAD_SECRET, $param_secret)) {
        return true;
    }

    // 3. Or logged-in administrator
    if (current_user_can('manage_options')) {
        return true;
    }

    return new WP_Error('rest_forbidden', 'Unauthorized request.', array('status' => 401));
}

function freebirds_api_record_vpn_lead($request) {
    $data = $request->get_json_params();
    if (empty($data)) {
        $data = $request->get_body_params();
    }

    $telemetry = isset($data['telemetry']) ? $data['telemetry'] : array();
    $result    = isset($data['result']) ? $data['result'] : array();
    $answers   = isset($data['formattedAnswers']) ? $data['formattedAnswers'] : (isset($data['answers']) ? $data['answers'] : array());

    $top_match = isset($result['topMatch']) ? $result['topMatch'] : array();
    $runner_up = isset($result['runnerUp']) ? $result['runnerUp'] : array();

    $country     = sanitize_text_field($telemetry['country'] ?? '');
    $city        = sanitize_text_field($telemetry['city'] ?? '');
    $region      = sanitize_text_field($telemetry['region'] ?? '');
    $client_ip   = sanitize_text_field($telemetry['clientIp'] ?? '');
    $timezone    = sanitize_text_field($telemetry['timezone'] ?? 'UTC');
    $coordinates = sanitize_text_field($telemetry['coordinates'] ?? '');
    $user_agent  = sanitize_text_field($telemetry['userAgent'] ?? '');

    $top_name    = sanitize_text_field($top_match['name'] ?? 'NordVPN');
    $top_score   = sanitize_text_field($top_match['matchPercentage'] ?? '95');
    $top_price   = sanitize_text_field($top_match['price'] ?? '');
    $top_reasons = '';
    if (!empty($top_match['reasons']) && is_array($top_match['reasons'])) {
        $top_reasons = implode('||', array_map('sanitize_text_field', $top_match['reasons']));
    }

    $runner_name = sanitize_text_field($runner_up['name'] ?? '');
    $runner_score= sanitize_text_field($runner_up['matchPercentage'] ?? '');
    $runner_price= sanitize_text_field($runner_up['price'] ?? '');

    $q1_text = sanitize_textarea_field($answers['q1Text'] ?? (is_array($answers['q1'] ?? null) ? implode(', ', $answers['q1']) : ''));
    $q2_text = sanitize_text_field($answers['q2Text'] ?? ($answers['q2'] ?? ''));
    $q3_text = sanitize_text_field($answers['q3Text'] ?? ($answers['q3'] ?? ''));
    $q4_text = sanitize_textarea_field($answers['q4Text'] ?? (is_array($answers['q4'] ?? null) ? implode(', ', $answers['q4']) : ''));
    $q5_text = sanitize_text_field($answers['q5Text'] ?? ($answers['q5'] ?? ''));

    // Post title e.g. "[BD] NordVPN — Oct 5, 2026 4:30 pm"
    $title_tag = !empty($country) ? "[$country] " : (!empty($city) ? "[$city] " : "");
    $post_title = $title_tag . $top_name . ' (' . $top_score . '%) — ' . current_time('M j, Y g:i a');

    $post_id = wp_insert_post(array(
        'post_type'    => 'vpn_lead',
        'post_status'  => 'publish',
        'post_title'   => $post_title,
    ));

    if (is_wp_error($post_id)) {
        return new WP_Error('insert_failed', $post_id->get_error_message(), array('status' => 500));
    }

    // Save metadata
    update_post_meta($post_id, '_lead_ip', $client_ip);
    update_post_meta($post_id, '_lead_country', $country);
    update_post_meta($post_id, '_lead_city', $city);
    update_post_meta($post_id, '_lead_region', $region);
    update_post_meta($post_id, '_lead_timezone', $timezone);
    update_post_meta($post_id, '_lead_coordinates', $coordinates);
    update_post_meta($post_id, '_lead_user_agent', $user_agent);

    update_post_meta($post_id, '_lead_top_match', $top_name);
    update_post_meta($post_id, '_lead_top_score', $top_score);
    update_post_meta($post_id, '_lead_top_price', $top_price);
    update_post_meta($post_id, '_lead_top_reasons', $top_reasons);

    update_post_meta($post_id, '_lead_runner_up', $runner_name);
    update_post_meta($post_id, '_lead_runner_score', $runner_score);
    update_post_meta($post_id, '_lead_runner_price', $runner_price);

    update_post_meta($post_id, '_lead_q1', $q1_text);
    update_post_meta($post_id, '_lead_q2', $q2_text);
    update_post_meta($post_id, '_lead_q3', $q3_text);
    update_post_meta($post_id, '_lead_q4', $q4_text);
    update_post_meta($post_id, '_lead_q5', $q5_text);

    return new WP_REST_Response(array(
        'success' => true,
        'lead_id' => $post_id,
        'message' => 'VPN quiz lead recorded successfully in WordPress.'
    ), 200);
}
