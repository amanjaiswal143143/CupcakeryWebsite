import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Star, MessageSquare } from "lucide-react";
import React from "react";

interface ReviewFormProps {
  orderId: number;
  onSubmit?: () => void;
}

export default function ReviewForm({ orderId, onSubmit }: ReviewFormProps) {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/testimonials", {
        name,
        comment,
        rating,
        orderId
      });

      toast({
        title: "Thank you for your review!",
        description: "Your review will be visible after moderation.",
      });

      // Reset form
      setName("");
      setComment("");
      setRating(5);
      setShowForm(false);
      onSubmit?.();
    } catch (error) {
      toast({
        title: "Failed to submit review",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <div className="flex flex-col items-center space-y-4 p-6">
        <MessageSquare className="h-12 w-12 text-primary" />
        <h2 className="text-2xl font-semibold text-center">
          Share Your Experience
        </h2>
        <p className="text-center text-muted-foreground">
          Your feedback helps others make better choices
        </p>
        <Button 
          size="lg"
          onClick={() => setShowForm(true)}
          className="mt-4"
        >
          Write a Review
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write Your Review</CardTitle>
        <CardDescription>
          Tell us about your order and help others make better choices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none transition-colors"
                >
                  <Star
                    className={`h-6 w-6 ${
                      value <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Share your experience with the product and service"
              rows={4}
            />
          </div>
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}