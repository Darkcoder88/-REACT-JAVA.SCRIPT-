"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 md:left-auto md:right-4 md:w-96">
      <div className="bg-card border border-border/50 rounded-lg shadow-lg p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Install K&V Chat</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Install our app for a better experience and quick access from your home screen.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleInstall} className="flex-1 bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Install
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowPrompt(false)} className="flex-1">
                Not now
              </Button>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setShowPrompt(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}