import { CreditCard, Wallet, Globe } from "lucide-react";

export function PaymentMethods() {
  return (
    <section className="py-16 bg-[#F4F4F4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl text-[#1F2933] mb-4 font-semibold">
            We Accept Secure Payments
          </h2>
          <p className="text-[#1F2933]/60 max-w-2xl mx-auto">
            Choose the payment method that works best for you. We support both local and international secure transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* CIB / Edahabiya */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#D4AF37] transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors">
              <CreditCard className="w-8 h-8 text-[#D4AF37] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2933] mb-2">Edahabiya & CIB</h3>
            <p className="text-sm text-[#1F2933]/60">
              Secure local payments via Algérie Poste and CIB network (Chargily).
            </p>
          </div>

          {/* PayPal */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#003087] transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#003087] transition-colors">
              <Wallet className="w-8 h-8 text-[#003087] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2933] mb-2">PayPal</h3>
            <p className="text-sm text-[#1F2933]/60">
              Fast and secure international payments with buyer protection.
            </p>
          </div>

          {/* Visa / Mastercard */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#1F2933] transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#1F2933] transition-colors">
              <Globe className="w-8 h-8 text-[#1F2933] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2933] mb-2">Visa / Mastercard</h3>
            <p className="text-sm text-[#1F2933]/60">
              We accept major international credit and debit cards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
