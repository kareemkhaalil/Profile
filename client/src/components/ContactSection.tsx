import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact/message", data);
      toast({
        title: "Message sent successfully! 📧",
        description: "Thanks for reaching out! I'll receive your message immediately and reply to your email soon.",
        variant: "default",
        duration: 5000,
      });
      reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#1E1E1E] section">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Get In <span className="text-[#00CCFF]">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-[#00CCFF] mx-auto rounded-full mb-6"></div>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to
            bring your mobile app idea to life.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#00CCFF]/20 flex items-center justify-center text-[#00CCFF] mr-4 flex-shrink-0">
                  <i className="ri-map-pin-line"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Location</h3>
                  <p className="text-[#B0B0B0]">Damietta, EGY</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#00CCFF]/20 flex items-center justify-center text-[#00CCFF] mr-4 flex-shrink-0">
                  <i className="ri-mail-line"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Email</h3>
                  <p className="text-[#B0B0B0]">karem2003.kk@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#00CCFF]/20 flex items-center justify-center text-[#00CCFF] mr-4 flex-shrink-0">
                  <i className="ri-phone-line"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Phone</h3>
                  <p className="text-[#B0B0B0]">+20 1285122680</p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-medium mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center text-[#B0B0B0] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors"
                  >
                    <i className="ri-github-fill"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center text-[#B0B0B0] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors"
                  >
                    <i className="ri-linkedin-fill"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center text-[#B0B0B0] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors"
                  >
                    <i className="ri-twitter-fill"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center text-[#B0B0B0] hover:bg-[#00CCFF] hover:text-[#121212] transition-colors"
                  >
                    <i className="ri-dribbble-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-6">
              <p className="text-lg text-[#B0B0B0]">
                Feel free to reach out to me directly via email:
              </p>
              <a 
                href="mailto:karem2003.kk@gmail.com?subject=Portfolio Contact"
                className="inline-block px-8 py-4 rounded-full bg-[#00CCFF] text-[#121212] font-medium hover:bg-[#33D6FF] transition-all duration-300"
              >
                Send Email <i className="ri-mail-send-line ml-2"></i>
              </a>
              <p className="text-sm text-[#808080] mt-4">
                I'll get back to you as soon as possible!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
