
import { useState } from "react";
import Layout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Settings as SettingsIcon } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const generalSchema = z.object({
  siteName: z.string().min(2, { message: "Site name must be at least 2 characters" }),
  siteDescription: z.string().min(10, { message: "Site description must be at least 10 characters" }),
  contactEmail: z.string().email({ message: "Must be a valid email address" }),
  contactPhone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  contactAddress: z.string().min(5, { message: "Address must be at least 5 characters" }),
  copyrightText: z.string().min(2, { message: "Copyright text is required" })
});

const socialSchema = z.object({
  twitter: z.string().url({ message: "Must be a valid URL" }).or(z.literal("")),
  facebook: z.string().url({ message: "Must be a valid URL" }).or(z.literal("")),
  linkedin: z.string().url({ message: "Must be a valid URL" }).or(z.literal("")),
  instagram: z.string().url({ message: "Must be a valid URL" }).or(z.literal("")),
  github: z.string().url({ message: "Must be a valid URL" }).or(z.literal(""))
});

const seoSchema = z.object({
  metaTitle: z.string().min(5, { message: "Meta title must be at least 5 characters" }),
  metaDescription: z.string().min(10, { message: "Meta description must be at least 10 characters" }),
  ogImage: z.string().url({ message: "Must be a valid URL" }),
  googleAnalyticsId: z.string().optional(),
  robotsTxt: z.string()
});

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  
  const generalForm = useForm<z.infer<typeof generalSchema>>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      siteName: "TechSphere",
      siteDescription: "Enterprise IT solutions for digital transformation",
      contactEmail: "info@techsphere.com",
      contactPhone: "+1 (555) 123-4567",
      contactAddress: "123 Tech Plaza, Silicon Valley, CA 94043",
      copyrightText: "© 2023 TechSphere. All rights reserved."
    },
  });
  
  const socialForm = useForm<z.infer<typeof socialSchema>>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      twitter: "https://twitter.com/techsphere",
      facebook: "https://facebook.com/techsphere",
      linkedin: "https://linkedin.com/company/techsphere",
      instagram: "https://instagram.com/techsphere",
      github: "https://github.com/techsphere"
    },
  });
  
  const seoForm = useForm<z.infer<typeof seoSchema>>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      metaTitle: "TechSphere | Enterprise IT Solutions",
      metaDescription: "TechSphere provides enterprise-grade IT solutions for businesses on their digital transformation journey.",
      ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      googleAnalyticsId: "UA-12345678-9",
      robotsTxt: "User-agent: *\nAllow: /"
    },
  });
  
  const onSubmitGeneral = async (values: z.infer<typeof generalSchema>) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Saving general settings:", values);
      toast.success("General settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  const onSubmitSocial = async (values: z.infer<typeof socialSchema>) => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Saving social settings:", values);
      toast.success("Social media settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  const onSubmitSEO = async (values: z.infer<typeof seoSchema>) => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Saving SEO settings:", values);
      toast.success("SEO settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <SettingsIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border overflow-hidden">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b">
              <TabsList className="h-auto p-0">
                <TabsTrigger 
                  value="general"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
                >
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="social"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
                >
                  Social Media
                </TabsTrigger>
                <TabsTrigger 
                  value="seo"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
                >
                  SEO
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="general" className="mt-0">
                <Form {...generalForm}>
                  <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={generalForm.control}
                        name="siteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your site name" {...field} />
                            </FormControl>
                            <FormDescription>
                              The name of your website that appears in the header and title
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input placeholder="contact@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Primary contact email for your organization
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={generalForm.control}
                      name="siteDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A brief description of your website..."
                              rows={2}
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            A short description that appears in the footer and other locations
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={generalForm.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="copyrightText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Copyright Text</FormLabel>
                            <FormControl>
                              <Input placeholder="© 2023 Your Company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={generalForm.control}
                      name="contactAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="123 Street Name, City, Country"
                              rows={2}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSaving}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="social" className="mt-0">
                <Form {...socialForm}>
                  <form onSubmit={socialForm.handleSubmit(onSubmitSocial)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={socialForm.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://twitter.com/yourusername" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={socialForm.control}
                        name="facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://facebook.com/yourpage" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={socialForm.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/company/yourcompany" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={socialForm.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://instagram.com/yourusername" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={socialForm.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/yourorganization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSaving}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="seo" className="mt-0">
                <Form {...seoForm}>
                  <form onSubmit={seoForm.handleSubmit(onSubmitSEO)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={seoForm.control}
                        name="metaTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Website Name | Tagline" {...field} />
                            </FormControl>
                            <FormDescription>
                              The title that appears in search engine results (50-60 characters recommended)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={seoForm.control}
                        name="googleAnalyticsId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Google Analytics ID</FormLabel>
                            <FormControl>
                              <Input placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" {...field} />
                            </FormControl>
                            <FormDescription>
                              Your Google Analytics tracking ID
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={seoForm.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A brief description of your website for search engines..."
                              rows={2}
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            The description that appears in search engine results (150-160 characters recommended)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={seoForm.control}
                      name="ogImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Social Image (OG Image)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourdomain.com/image.jpg" {...field} />
                          </FormControl>
                          <FormDescription>
                            This image will be used when sharing your site on social media (1200×630 pixels recommended)
                          </FormDescription>
                          <FormMessage />
                          {field.value && (
                            <div className="mt-2 border rounded overflow-hidden">
                              <img 
                                src={field.value} 
                                alt="OG Image preview" 
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={seoForm.control}
                      name="robotsTxt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>robots.txt Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="User-agent: *\nAllow: /"
                              rows={4}
                              className="font-mono text-sm"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Instructions for search engine crawlers
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSaving}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
