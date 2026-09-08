import re

with open('VPN.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'<style[\s\S]*?</style>', '', html)
html = re.sub(r'<script[\s\S]*?</script>', '', html)
html = re.sub(r'<h1[^>]*>', '\n\n# ', html)
html = re.sub(r'<h2[^>]*>', '\n\n## ', html)
html = re.sub(r'<h3[^>]*>', '\n\n### ', html)
html = re.sub(r'<h4[^>]*>', '\n\n#### ', html)
html = re.sub(r'</h[1-6]>', '\n', html)
html = re.sub(r'<p[^>]*>', '\n', html)
html = re.sub(r'</p>', '', html)
html = re.sub(r'<li[^>]*>', '\n* ', html)
html = re.sub(r'</li>', '', html)

text = re.sub(r'<[^>]+>', '', html)
text = text.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&#39;', "'").replace('&quot;', '"').replace('&rarr;', '->').replace('&rsquo;', "'")
text = re.sub(r'\n\s*\n', '\n\n', text)

with open('VPN_parsed.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print('Done parsing VPN.html')
