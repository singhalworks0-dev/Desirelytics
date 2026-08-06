import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "15067006866";
  const defaultMessage = encodeURIComponent("Hi Desirelytics team, I would like to inquire about your SEO and digital marketing services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-[999] flex items-center justify-center rounded-full bg-[#25D366] p-3 text-white shadow-md hover:bg-[#20ba5a] transition-colors"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white fill-white" />
    </a>
  );
}
