import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { contactApiService } from "@/api/contact-api.service";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Họ và tên phải dài hơn 2 kí tự" }),
  email: z.string().email({ message: "Địa chỉ email không hợp lệ" }),
  message: z
    .string()
    .min(10, { message: "Tin nhắn phải dài ít nhất 10 kí tự" }),
});

export const RecruitmentContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await contactApiService.createRecruitmentContact(values);
      toast.success(
        "Cảm ơn vì câu hỏi của bạn. Chúng tôi sẽ phản hồi sớm nhất!"
      );
      form.reset();
    } catch (error) {
      toast.error("Có lỗi xảy ra trong quá trình gửi tin nhắn");
      console.error("Error submitting recruitment form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên *</FormLabel>
              <FormControl>
                <Input placeholder="Họ và tên..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Câu hỏi về tuyển dụng *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hãy cho chúng tôi biết câu hỏi để có thể giải đáp thắc mắc của bạn..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Gửi câu hỏi
        </Button>
      </form>
    </Form>
  );
};
