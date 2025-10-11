'use client';
import { MessageCircle } from 'lucide-react';

export default function PromoChatButton({ promo }) {
  const message = `Halo, saya tertarik dengan promo ${promo.title}. Bisa info lebih lanjut?`;
  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    message
  )}`;

  return (
    <button
      onClick={() => window.open(waUrl, '_blank')}
      className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition mx-auto"
    >
      <MessageCircle size={20} />
      Chat Now
    </button>
  );
}
