import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Loader2, Sparkles, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAddMessage, useGetAllMessages } from "./hooks/useQueries";

// ── SVG Doodles ─────────────────────────────────────────────────────────────
const HeartDoodle = ({ size = 24, color = "#F06FA0", className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    aria-hidden="true"
  >
    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
  </svg>
);

const SparkDoodle = ({ size = 20, color = "#F5C24F", className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0l2.236 6.764L21 9l-6.764 2.236L12 18l-2.236-6.764L3 9l6.764-2.236z" />
  </svg>
);

const WavySeparator = ({ bottomColor = "#FFF4DC" }) => (
  <div style={{ lineHeight: 0 }}>
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: 60 }}
      aria-hidden="true"
    >
      <path
        d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
        fill={bottomColor}
      />
    </svg>
  </div>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const reasons = [
  "You always know what to say 💬",
  "Your laugh is literally contagious 😂",
  "You show up without being asked 💪",
  "You make every ordinary day special ✨",
  "You give the best hugs in the world 🤗",
  "You believe in me more than I do 🌟",
];

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const loveNotesRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const { data: messages = [], isLoading: messagesLoading } =
    useGetAllMessages();
  const addMessage = useAddMessage();

  const scrollToLoveNotes = () => {
    loveNotesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in your name and message 💌");
      return;
    }
    try {
      await addMessage.mutateAsync({
        author: name.trim(),
        text: message.trim(),
      });
      toast.success("Love note sent! 💖");
      setName("");
      setMessage("");
    } catch {
      toast.error("Oops! Something went wrong 😢");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.82 0.09 45) 0%, oklch(0.87 0.12 85) 100%)",
      }}
    >
      <Toaster position="top-center" />

      {/* ── Sticky Header ─────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: "oklch(0.85 0.13 85)" }}
        data-ocid="header.panel"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartDoodle size={22} color="#F06FA0" />
            <span
              className="font-script text-3xl font-bold"
              style={{ color: "oklch(0.15 0.01 30)" }}
            >
              BFF
            </span>
            <HeartDoodle size={22} color="#F06FA0" />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Home", href: "#home" },
              { label: "Love Notes", href: "#love-notes" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="font-semibold text-sm transition-colors hover:opacity-70"
                style={{ color: "oklch(0.15 0.01 30)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            onClick={scrollToLoveNotes}
            data-ocid="header.primary_button"
            className="rounded-full font-bold text-white px-5 shadow-md hover:scale-105 transition-transform"
            style={{ backgroundColor: "oklch(0.72 0.14 355)", border: "none" }}
          >
            <Heart size={16} className="mr-1" />
            Send Love
          </Button>
        </div>
      </header>

      {/* Main content container */}
      <main
        className="max-w-5xl mx-auto my-8 rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "oklch(0.97 0.035 85)" }}
      >
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          id="home"
          className="relative px-8 py-20 text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.14 355 / 0.6) 0%, oklch(0.85 0.13 85 / 0.8) 100%), linear-gradient(135deg, oklch(0.82 0.09 45) 0%, oklch(0.87 0.12 85) 100%)",
          }}
        >
          <div className="absolute top-8 left-8 animate-float">
            <HeartDoodle size={36} color="#F06FA0" />
          </div>
          <div
            className="absolute top-12 right-12 animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <SparkDoodle size={30} color="#F5C24F" />
          </div>
          <div
            className="absolute bottom-16 left-20 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <SparkDoodle size={24} color="#F5C24F" />
          </div>
          <div
            className="absolute bottom-20 right-16 animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <HeartDoodle size={28} color="#F06FA0" />
          </div>
          <div
            className="absolute top-20 left-1/4 animate-float"
            style={{ animationDelay: "0.8s" }}
          >
            <Star size={20} fill="#F5C24F" stroke="none" aria-hidden="true" />
          </div>
          <div
            className="absolute top-16 right-1/4 animate-float"
            style={{ animationDelay: "1.2s" }}
          >
            <Sparkles
              size={22}
              style={{ color: "#F06FA0" }}
              aria-hidden="true"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p
              className="text-sm font-bold uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.15 0.01 30 / 0.7)" }}
            >
              This one is for you ✨
            </p>
            <h1
              className="font-script text-5xl md:text-7xl font-bold mb-4"
              style={{
                color: "white",
                textShadow: "0 2px 12px rgba(0,0,0,0.2)",
              }}
            >
              For My Bestie Myra!
            </h1>
            <p
              className="text-xl md:text-2xl font-semibold mt-3"
              style={{
                color: "white",
                textShadow: "0 1px 6px rgba(0,0,0,0.15)",
              }}
            >
              Chhota Don 👑
            </p>
            <p
              className="mt-4 text-base max-w-lg mx-auto"
              style={{ color: "oklch(0.15 0.01 30 / 0.75)" }}
            >
              A little corner of the internet dedicated entirely to celebrating
              the most incredible human I know.
            </p>
          </motion.div>
        </section>

        <WavySeparator bottomColor="oklch(0.97 0.035 85)" />

        {/* ── Why You're the Best ───────────────────────────────────────────── */}
        <section className="px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-display text-3xl font-bold text-center uppercase tracking-tight mb-10"
              style={{ color: "oklch(0.15 0.01 30)" }}
            >
              Why You&apos;re the Best!
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "oklch(0.25 0.02 30)" }}
              >
                There are no words big enough to describe how amazing you are.
                You walk into a room and everything feels lighter. You&apos;re
                the kind of person people write songs about, the kind that makes
                life infinitely better just by being in it.
              </p>
              <ul className="space-y-3">
                {reasons.map((r, i) => (
                  <motion.li
                    key={r}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-sm font-medium"
                    style={{ color: "oklch(0.25 0.02 30)" }}
                  >
                    <HeartDoodle size={16} color="#F06FA0" />
                    {r}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.82 0.09 45 / 0.5) 0%, oklch(0.85 0.13 85 / 0.5) 100%)",
                  border: "3px dashed oklch(0.72 0.14 355 / 0.5)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                }}
              >
                <div className="absolute -top-3 -left-3 animate-wiggle">
                  <HeartDoodle size={28} color="#F06FA0" />
                </div>
                <div
                  className="absolute -top-3 -right-3 animate-wiggle"
                  style={{ animationDelay: "0.5s" }}
                >
                  <HeartDoodle size={28} color="#F5C24F" />
                </div>
                <div
                  className="absolute -bottom-3 -left-3 animate-wiggle"
                  style={{ animationDelay: "1s" }}
                >
                  <HeartDoodle size={28} color="#F5C24F" />
                </div>
                <div
                  className="absolute -bottom-3 -right-3 animate-wiggle"
                  style={{ animationDelay: "1.5s" }}
                >
                  <HeartDoodle size={28} color="#F06FA0" />
                </div>

                <div
                  className="w-full h-48 rounded-xl mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.14 355 / 0.5) 0%, oklch(0.82 0.09 45 / 0.7) 100%)",
                  }}
                />
                <p
                  className="font-script text-2xl font-bold"
                  style={{ color: "oklch(0.15 0.01 30)" }}
                >
                  My Ride or Die 💖
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.45 0.02 30)" }}
                >
                  forever &amp; always
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Love Notes ─────────────────────────────────────────────────────── */}
        <section id="love-notes" ref={loveNotesRef} className="px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-display text-3xl font-bold text-center uppercase tracking-tight mb-2"
              style={{ color: "oklch(0.15 0.01 30)" }}
            >
              Share the Love! 💌
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Leave a little love note for the bestie!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto rounded-3xl p-8 mb-12"
            style={{
              backgroundColor: "oklch(0.98 0.025 80)",
              border: "2px solid oklch(0.85 0.13 85)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            }}
            data-ocid="love_notes.panel"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="love-note-name"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "oklch(0.25 0.02 30)" }}
                >
                  Your Name 💝
                </label>
                <Input
                  id="love-note-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name..."
                  className="rounded-xl"
                  data-ocid="love_notes.input"
                />
              </div>
              <div>
                <label
                  htmlFor="love-note-message"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "oklch(0.25 0.02 30)" }}
                >
                  Your Message 💌
                </label>
                <Textarea
                  id="love-note-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something sweet..."
                  rows={4}
                  className="rounded-xl resize-none"
                  data-ocid="love_notes.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={addMessage.isPending}
                className="w-full rounded-xl font-bold text-white py-5 hover:scale-[1.02] transition-transform"
                style={{
                  backgroundColor: "oklch(0.72 0.14 355)",
                  border: "none",
                }}
                data-ocid="love_notes.submit_button"
              >
                {addMessage.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Heart size={16} className="mr-2" /> Send Love Note 💖
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {messagesLoading ? (
            <div
              className="flex justify-center py-8"
              data-ocid="love_notes.loading_state"
            >
              <Loader2
                className="h-8 w-8 animate-spin"
                style={{ color: "oklch(0.72 0.14 355)" }}
              />
            </div>
          ) : messages.length === 0 ? (
            <div
              className="text-center py-8"
              data-ocid="love_notes.empty_state"
            >
              <HeartDoodle size={40} color="#F06FA0" className="mx-auto mb-3" />
              <p className="text-muted-foreground">
                Be the first to leave a love note! 💕
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={String(msg.timestamp)}
                    data-ocid={`love_notes.item.${i + 1}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-2xl p-5"
                    style={{
                      backgroundColor: "oklch(0.98 0.025 80)",
                      borderLeft: "4px solid oklch(0.72 0.14 355)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: "oklch(0.3 0.02 30)" }}
                    >
                      &ldquo;{msg.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <HeartDoodle size={14} color="#F06FA0" />
                      <span
                        className="text-xs font-bold"
                        style={{ color: "oklch(0.65 0.19 355)" }}
                      >
                        {msg.author}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        <footer>
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: 50 }}
            aria-hidden="true"
          >
            <path
              d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
              fill="oklch(0.78 0.14 65)"
            />
          </svg>

          <div
            className="py-10 px-8"
            style={{ backgroundColor: "oklch(0.78 0.14 65)" }}
          >
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p
                  className="font-script text-2xl font-bold mb-1"
                  style={{ color: "oklch(0.15 0.01 30)" }}
                >
                  Made with 💖 for Myra — Chhota Don
                </p>
                <p className="text-sm" style={{ color: "oklch(0.25 0.02 30)" }}>
                  Here&rsquo;s to every laugh, every memory, every moment ✨
                </p>
              </div>
              <div className="flex gap-2" aria-hidden="true">
                {["h1", "h2", "h3", "h4", "h5"].map((k) => (
                  <HeartDoodle key={k} size={20} color="#F06FA0" />
                ))}
              </div>
            </div>
          </div>

          <div
            className="py-3 px-8 text-center text-xs"
            style={{ backgroundColor: "oklch(0.72 0.14 355)", color: "white" }}
          >
            Published by aadiiiii 💕 &nbsp;&bull;&nbsp; &copy;{" "}
            {new Date().getFullYear()} &nbsp;&bull;&nbsp; Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:opacity-80"
            >
              caffeine.ai
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
