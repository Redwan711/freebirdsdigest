$html = Get-Content -Path 'scratch/VPN.html' -Raw
$html = $html -replace '<style[\s\S]*?</style>', '' -replace '<script[\s\S]*?</script>', ''
$html = $html -replace '<h1[^>]*>', "`n`n# " -replace '<h2[^>]*>', "`n`n## " -replace '<h3[^>]*>', "`n`n### " -replace '<h4[^>]*>', "`n`n#### "
$html = $html -replace '</h[1-6]>', "`n" -replace '<p[^>]*>', "`n" -replace '</p>', '' -replace '<li[^>]*>', "`n* " -replace '</li>', ''
$text = $html -replace '<[^>]+>', '' -replace '&nbsp;', ' ' -replace '&amp;', '&' -replace '&#39;', "'" -replace '&quot;', '"' -replace '&rarr;', '->' -replace '&rsquo;', "'"
$text = $text -replace '(\r?\n)\s*(\r?\n)+', "`n`n"
Set-Content -Path 'scratch/VPN_parsed.txt' -Value $text
Write-Host "Done"
