
import { useState } from "react";
import { MapPin, Plus } from "lucide-react";
import { toast } from "react-toastify";
export default function AddressesSection() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleAddAddress = () => {
    if (!country.trim() || !city.trim() || !street.trim()) {
      toast.error("Please fill country, city and street");
      return;
    }
    toast.success("Address added");
    setCountry("");
    setCity("");
    setStreet("");
    setBuilding("");
    setPostalCode("");
  };

  return (
    <div className="bg-amazon-surface rounded-xl border border-amazon-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-amazon-textDark flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amazon-orange" aria-hidden="true" />
          Addresses
        </h3>
      </div>
      <div className="space-y-3 mb-4">
        <p className="text-sm text-amazon-textLight">No addresses yet.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          placeholder="Country"
          className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          placeholder="City"
          className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          placeholder="Street"
          className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          placeholder="Building"
          className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        />
        <input
          placeholder="Postal code"
          className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange sm:col-span-2"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <button
        onClick={handleAddAddress}
        className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-amazon-orange text-white hover:bg-amazon-orangeHover active:bg-amazon-orangeHover px-4 py-2 text-sm mt-4"
      >
        <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
        Add Address
      </button>
    </div>
  );
}