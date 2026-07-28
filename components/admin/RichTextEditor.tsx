"use client"

import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { useRef } from "react"
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  ImageIcon,
  Loader2,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(active && "bg-muted text-foreground")}
    >
      {children}
    </Button>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)

  async function handleImageFile(file: File) {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/blogs/image-upload", { method: "POST", body: formData })
      const json = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !json.url) throw new Error(json.error ?? "Upload failed")
      editor.chain().focus().setImage({ src: json.url }).run()
    } catch (err) {
      console.error("[RichTextEditor] image upload failed", err)
    } finally {
      setUploading(false)
    }
  }

  function setLink() {
    const previousUrl = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("Link URL", previousUrl ?? "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-black/[0.08] px-2 py-1.5">
      <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold />
      </ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic />
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-black/10" />
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 />
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-black/10" />
      <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List />
      </ToolbarButton>
      <ToolbarButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered />
      </ToolbarButton>
      <ToolbarButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote />
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-black/10" />
      <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
        <LinkIcon />
      </ToolbarButton>
      <ToolbarButton label="Insert image" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
        {uploading ? <Loader2 className="animate-spin" /> : <ImageIcon />}
      </ToolbarButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageFile(file)
          e.target.value = ""
        }}
      />
    </div>
  )
}

export function RichTextEditor({
  content,
  onChange,
  placeholder,
}: {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      Placeholder.configure({ placeholder: placeholder ?? "Start writing…" }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "article-prose min-h-[50vh] px-6 py-6 focus:outline-none sm:px-10",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  return (
    <div className="rounded-lg border border-black/[0.08]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
