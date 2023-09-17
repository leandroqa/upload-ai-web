import { FileVideo, Upload } from "lucide-react"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { ChangeEvent, useMemo, useState } from "react"

export const VideoInputForm = () => {
  const [ videoFile, setVideoFile ] = useState<File | null>(null)

  function handleFileSelected(event : ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (! files) {
      return
    }
    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  const previewUrl = useMemo(() => {
    if (! videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className="space-y-6">
            <label
              htmlFor="video"
              className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
            >
              {previewUrl ? (
                <video src={previewUrl} controls={false} className="pointer-events-none absolute inset-0"/>
              ) : (
                <>
                  <FileVideo className="w-4 h-4" />
                  Load video
                </>
              )}

            </label>
            <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected}/>
            <Separator/>
            <div className="space-y-2">
              <Label htmlFor="transcription_prompt">Transcription prompt</Label>
              <Textarea
                id="transcription_prompt"
                className="h-20 leading-relaxed resize-none"
                placeholder="include key words mentioned in the video separeted by comma (,)"
              />
            </div>
            <Button type="submit" className="w-full">
              Load video
              <Upload  className="h-4 w-4 ml-2" />
            </Button>
          </form>
  )
}