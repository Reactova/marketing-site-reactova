$docxDir = "g:\REACTOVA\Website\v1\Marketing\client\src\assets\docx"
$outDir = "g:\REACTOVA\Website\v1\Marketing\client\src\assets\docx\extracted_text"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir }

$files = Get-ChildItem -Path $docxDir -Filter *.docx

foreach ($file in $files) {
    $tempDir = Join-Path $outDir "temp_$($file.BaseName)"
    $zipPath = Join-Path $outDir "$($file.BaseName).zip"
    
    Copy-Item $file.FullName $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $tempDir -Force
    
    $xmlPath = Join-Path $tempDir "word/document.xml"
    if (Test-Path $xmlPath) {
        [xml]$xml = Get-Content $xmlPath
        $namespaces = @{w = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
        
        # Get all paragraphs and join their text with newlines
        $paragraphs = Select-Xml -Xml $xml -XPath "//w:p" -Namespace $namespaces | Select-Object -ExpandProperty Node
        $lines = foreach ($p in $paragraphs) {
            $p.InnerText
        }
        $textContent = $lines -join "`r`n"
        
        $outPath = Join-Path $outDir "$($file.BaseName).txt"
        Set-Content -Path $outPath -Value $textContent
    }
    
    Remove-Item $zipPath -Force
    Remove-Item $tempDir -Recurse -Force
}
