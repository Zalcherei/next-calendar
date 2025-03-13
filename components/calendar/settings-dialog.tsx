"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CalendarSettings, LANGUAGES, REGIONS, TIME_ZONES } from "@/lib/types";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: CalendarSettings;
  onSaveSettings: (settings: CalendarSettings) => void;
}

export function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onSaveSettings,
}: SettingsDialogProps) {
  const [currentSettings, setCurrentSettings] = useState<CalendarSettings>(settings);

  const handleSave = () => {
    onSaveSettings(currentSettings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Calendar Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Language</Label>
                <Select
                  value={currentSettings.language}
                  onValueChange={(value) =>
                    setCurrentSettings({ ...currentSettings, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Region</Label>
                <Select
                  value={currentSettings.region}
                  onValueChange={(value) =>
                    setCurrentSettings({ ...currentSettings, region: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Time Zone</Label>
                <Select
                  value={currentSettings.timeZone}
                  onValueChange={(value) =>
                    setCurrentSettings({ ...currentSettings, timeZone: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_ZONES.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label>Email Notifications</Label>
                <Switch
                  checked={currentSettings.notifications.email}
                  onCheckedChange={(checked) =>
                    setCurrentSettings({
                      ...currentSettings,
                      notifications: {
                        ...currentSettings.notifications,
                        email: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Desktop Notifications</Label>
                <Switch
                  checked={currentSettings.notifications.desktop}
                  onCheckedChange={(checked) =>
                    setCurrentSettings({
                      ...currentSettings,
                      notifications: {
                        ...currentSettings.notifications,
                        desktop: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Default Reminder (minutes before event)</Label>
                <Input
                  type="number"
                  min="0"
                  value={currentSettings.notifications.reminderDefault}
                  onChange={(e) =>
                    setCurrentSettings({
                      ...currentSettings,
                      notifications: {
                        ...currentSettings.notifications,
                        reminderDefault: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}