'use client'; // Ensure this is present

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const HTML_BOILERPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Preview</title>
</head>
<body>
    
</body>
</html>`;

export default function Home() {
  const [htmlCode, setHtmlCode] = useState('');
  const [preview, setPreview] = useState('');

  const handleGeneratePreview = () => {
    setPreview(htmlCode);
  };

  const handlePasteHTML = async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        throw new Error("Clipboard API is not available in this environment");
      }
      const text = await navigator.clipboard.readText();
      setHtmlCode(text || HTML_BOILERPLATE);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
      alert("Clipboard access is not available. Please paste the HTML manually.");
      setHtmlCode(HTML_BOILERPLATE);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <Card className="w-full max-w-3xl p-8 space-y-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">HTML Previewer</h1>
          <p className="text-gray-500">Enter your HTML code and see the preview.</p>
        </div>

        <Textarea
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
          placeholder="Enter your HTML code here..."
          className="min-h-[200px] font-mono"
        />

        <div className="flex justify-center gap-4">
          <Button
            onClick={handleGeneratePreview}
            className="bg-[#0F172A] hover:bg-[#1E293B]"
          >
            Generate Preview
          </Button>
          <Button
            onClick={handlePasteHTML}
            variant="outline"
            className="border-[#0F172A] text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Paste HTML
          </Button>
        </div>

        {preview && (
          <div className="mt-8 p-4 border rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: preview }} />
          </div>
        )}
      </Card>
    </main>
  );
}
