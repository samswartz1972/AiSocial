import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface CreatePostButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  label?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CreatePostButton = ({
  className = "",
  variant = "default",
  size = "default",
  showIcon = true,
  label = "Create Post",
  isOpen = false,
  onOpenChange,
}: CreatePostButtonProps) => {
  const [open, setOpen] = React.useState(isOpen);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`bg-primary text-white hover:bg-primary/90 ${className}`}
        >
          {showIcon && <Plus className="mr-2 h-4 w-4" />}
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="p-6 bg-white dark:bg-gray-950">
          <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="post-content" className="font-medium">
                What's on your mind?
              </label>
              <textarea
                id="post-content"
                className="min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Share your thoughts..."
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
              <Button variant="outline" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                AI Generate
              </Button>
            </div>
            <div className="flex justify-end pt-4">
              <Button>Post</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostButton;
