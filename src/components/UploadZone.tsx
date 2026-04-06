"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

interface UploadZoneProps {
  label: string;
  slotIndex: number;
  file: UploadedFile | null;
  onFileChange: (index: number, file: UploadedFile | null) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadZone({ label, slotIndex, file, onFileChange }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      onFileChange(slotIndex, { name: dropped.name, size: dropped.size, type: dropped.type, file: dropped });
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) {
      onFileChange(slotIndex, { name: selected.name, size: selected.size, type: selected.type, file: selected });
    }
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    onFileChange(slotIndex, null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const isImage = file && file.type.startsWith("image/");

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div
        onClick={() => !file && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 min-h-[160px] transition-all
          ${file
            ? "border-[#10B981] bg-green-50 cursor-default"
            : dragging
              ? "border-[#1E40AF] bg-blue-50 cursor-copy"
              : "border-slate-300 bg-white hover:border-[#1E40AF] hover:bg-blue-50 cursor-pointer"
          }
        `}
      >
        {file ? (
          <>
            {isImage ? (
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            )}
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800 truncate max-w-[200px]">{file.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{formatBytes(file.size)}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Ready
            </div>
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-200 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-slate-500 transition-colors"
              aria-label="Remove file"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${dragging ? "bg-[#1E40AF] text-white" : "bg-slate-100 text-slate-400"}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-700">
                {dragging ? "Drop it here!" : "Drop file here"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">or click to browse · PDF or image</p>
            </div>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
