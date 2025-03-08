import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

const milestoneSchema = z.object({
  name: z.string().min(1, "Milestone name is required"),
  payout: z.string().min(1, "Payout amount is required"),
});

const createProjectSchema = z.object({
  artist: z.string().min(1, "Artist name is required"),
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  fundingGoal: z.string().min(1, "Funding goal is required"),
  milestones: z.array(milestoneSchema).min(1, "At least one milestone is required"),
});

type CreateProjectInput = z.infer<typeof createProjectSchema>;

export default function CreateProject() {
  const { toast } = useToast();
  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      artist: "",
      title: "",
      description: "",
      fundingGoal: "",
      milestones: [{ name: "", payout: "" }],
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: CreateProjectInput) => {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create project");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      // Reset form and redirect to admin dashboard
      form.reset();
      window.location.href = "/admin-dashboard";
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const addMilestone = () => {
    const milestones = form.getValues("milestones");
    form.setValue("milestones", [...milestones, { name: "", payout: "" }]);
  };

  const removeMilestone = (index: number) => {
    const milestones = form.getValues("milestones");
    if (milestones.length > 1) {
      const newMilestones = milestones.filter((_, i) => i !== index);
      form.setValue("milestones", newMilestones);
    }
  };

  const onSubmit = (data: CreateProjectInput) => {
    createProjectMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Create New Project</h1>
          <Button variant="ghost" asChild>
            <Link href="/admin-dashboard">← Back to Dashboard</Link>
          </Button>
        </div>

        <div className="bg-[#111111] rounded-xl border border-white/10 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artist Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter artist name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter project description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fundingGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Goal ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter funding goal"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Milestones</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addMilestone}
                  >
                    Add Milestone
                  </Button>
                </div>

                {form.watch("milestones").map((_, index) => (
                  <div key={index} className="relative grid grid-cols-2 gap-4 p-4 bg-black/20 rounded-lg">
                    <FormField
                      control={form.control}
                      name={`milestones.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Milestone Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter milestone name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`milestones.${index}.payout`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payout Amount ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter payout amount"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Delete milestone button */}
                    {form.watch("milestones").length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500"
                        onClick={() => removeMilestone(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#C10000] hover:bg-[#A00000]"
                disabled={createProjectMutation.isPending}
              >
                {createProjectMutation.isPending ? "Creating..." : "Create Project"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}