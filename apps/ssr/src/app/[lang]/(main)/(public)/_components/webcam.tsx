"use client";
import * as Avatar from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import * as Dialog from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {RefreshCw, CameraOff} from "lucide-react";
import {useCallback, useRef, useState, useTransition} from "react";
import Webcam from "react-webcam";

export function WebcamCapture({
  handleImage,
  type,
  placeholder,
  allowCameraSwitch = false,
  capturedImage,
}: {
  type: "document" | "selfie";
  handleImage: (imageSrc: string | null) => void;
  allowCameraSwitch?: boolean;
  placeholder?: React.ReactElement;
  capturedImage?: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [facingMode, setFacingMode] = useState<"user" | "environment">(type === "selfie" ? "user" : "environment");
  const [image, setImage] = useState<string | null>(capturedImage || null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    startTransition(() => {
      if (!webcamRef.current) return;
      const imageSrc = webcamRef.current.getScreenshot();
      handleImage(imageSrc);
      setImage(imageSrc);
    });
  }, [webcamRef, handleImage]);
  return (
    <div className="webcam-container grid overflow-hidden rounded-md bg-black">
      <div className="webcam relative p-2">
        <div className="absolute inset-2 z-[1] flex items-center justify-center rounded-md text-white/10 ring ring-inset ring-white/10">
          <CameraOff className="size-32" />
        </div>
        {placeholder ? (
          <div className="absolute inset-2 z-[3] flex items-center justify-center">{placeholder}</div>
        ) : null}
        <Webcam
          audio={false}
          className={cn("background-transparent z-[2] h-auto w-full rounded-md")}
          mirrored={type === "selfie"}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          videoConstraints={{
            facingMode,
            aspectRatio: 16 / 9,
            width: 1920,
            height: 1080,
          }}
        />
      </div>
      <div className="actions grid grid-cols-3 items-center justify-center p-2 pt-0">
        <div className="captured size-10">
          <Dialog.Dialog>
            <Dialog.DialogTrigger>
              <Avatar.Avatar className="rounded-md">
                <Avatar.AvatarImage
                  className="rounded-md object-cover
                "
                  src={image ? image : ""}
                />
                <Avatar.AvatarFallback className="rounded-md bg-white/10" />
              </Avatar.Avatar>
            </Dialog.DialogTrigger>
            <Dialog.DialogContent className="w-max justify-center">
              <img alt="Captured" className="rounded-md" src={image ? image : ""} />
            </Dialog.DialogContent>
          </Dialog.Dialog>
        </div>
        <div className="capture flex justify-center">
          <Button
            className="size-10 rounded-full border-2 border-white bg-white ring ring-inset ring-black transition-all hover:bg-white hover:ring-4"
            disabled={isPending}
            onClick={capture}>
            <span className="sr-only">Capture</span>
          </Button>
        </div>
        <div className="switch flex justify-end">
          {allowCameraSwitch ? (
            <Button
              className="size-8 rounded-full bg-white/10 p-0 text-white"
              onClick={() => {
                setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
              }}
              variant="ghost">
              <RefreshCw className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
