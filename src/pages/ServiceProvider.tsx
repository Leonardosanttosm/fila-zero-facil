
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar,
  Share2,
  MessageCircle,
  Heart
} from "lucide-react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const ServiceProvider = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Mock data - em uma aplicação real, você buscaria estes dados de uma API
  const provider = {
    id: id || "1",
    name: "Dra. Ana Silveira",
    specialty: "Clínico Geral",
    rating: 4.8,
    address: "Av. Paulista, 1000 - São Paulo, SP",
    phone: "(11) 95555-1234",
    bio: "Médica com mais de 15 anos de experiência em clínica geral. Especialista em medicina preventiva e cuidados primários à saúde.",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
    scheduleType: "whatsapp", // pode ser "whatsapp", "phone" ou "app"
    services: [
      { id: "s1", name: "Consulta de rotina", duration: "30 min", price: "R$ 250,00" },
      { id: "s2", name: "Check-up completo", duration: "60 min", price: "R$ 450,00" },
      { id: "s3", name: "Retorno", duration: "20 min", price: "R$ 150,00" },
    ],
    availableDates: [
      { date: "2024-05-14", label: "Hoje", slots: ["09:00", "11:30", "14:00", "16:30"] },
      { date: "2024-05-15", label: "Amanhã", slots: ["08:30", "10:00", "13:30", "15:00", "17:30"] },
      { date: "2024-05-16", label: "16/05", slots: ["09:00", "10:30", "14:30", "16:00"] },
      { date: "2024-05-17", label: "17/05", slots: ["08:00", "11:00", "13:00", "15:30", "17:00"] },
      { date: "2024-05-18", label: "18/05", slots: ["09:30", "11:30", "14:00"] },
    ]
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when date changes
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) return;
    
    // Lógica para agendamento baseada no tipo de agendamento do prestador
    if (provider.scheduleType === "whatsapp") {
      const message = `Olá, gostaria de agendar um horário para ${selectedDate} às ${selectedTime}.`;
      const whatsappUrl = `https://wa.me/${provider.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else if (provider.scheduleType === "phone") {
      window.location.href = `tel:${provider.phone.replace(/\D/g, '')}`;
    } else {
      // Redirecionar para a página de confirmação de agendamento interno
      // history.push(`/booking/confirm?provider=${id}&date=${selectedDate}&time=${selectedTime}`);
      console.log(`Agendando para ${selectedDate} às ${selectedTime}`);
    }
  };

  if (!provider) {
    return <div>Prestador não encontrado</div>;
  }

  return (
    <div className="pb-16 md:pb-0 min-h-screen">
      <Navbar />
      <div className="relative">
        <div className="h-64 bg-filaZero-blue">
          <img 
            src={provider.imageUrl}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
        </div>
        <Link to="/search" className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white p-2 rounded-full shadow-md">
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md">
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <main className="container mx-auto px-4 -mt-20">
        <div className="bg-white rounded-t-3xl shadow-lg p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{provider.name}</h1>
              <p className="text-filaZero-darkGray">{provider.specialty}</p>
            </div>
            <div className="flex items-center bg-filaZero-lightBlue px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="ml-1 font-semibold">{provider.rating}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-start mb-2">
              <MapPin className="h-5 w-5 text-filaZero-darkGray mr-2 mt-0.5" />
              <p className="text-sm">{provider.address}</p>
            </div>
            <div className="flex items-center mb-2">
              <Phone className="h-5 w-5 text-filaZero-darkGray mr-2" />
              <p className="text-sm">{provider.phone}</p>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-filaZero-darkGray mr-2" />
              <p className="text-sm">Seg - Sex: 08:00 - 18:00</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sobre</h2>
            <p className="text-sm text-gray-700">{provider.bio}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Serviços</h2>
            <div className="space-y-3">
              {provider.services.map(service => (
                <div key={service.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-filaZero-darkGray">{service.duration}</p>
                  </div>
                  <span className="font-semibold">{service.price}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Disponibilidade</h2>
            <div className="overflow-x-auto py-2 -mx-4 px-4">
              <div className="flex space-x-3">
                {provider.availableDates.map(date => (
                  <button
                    key={date.date}
                    onClick={() => handleDateSelection(date.date)}
                    className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg min-w-[80px] ${
                      selectedDate === date.date 
                        ? "bg-filaZero-blue text-white" 
                        : "bg-filaZero-gray text-gray-700"
                    }`}
                  >
                    <span className="text-xs">{date.label}</span>
                    <Calendar className="h-5 w-5 my-1" />
                    <span className="text-xs">{date.slots.length} horários</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {selectedDate && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Horários disponíveis</h2>
              <div className="grid grid-cols-3 gap-2">
                {provider.availableDates
                  .find(d => d.date === selectedDate)?.slots
                  .map(time => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelection(time)}
                      className={`py-2 px-4 rounded-lg border text-center ${
                        selectedTime === time 
                          ? "bg-filaZero-blue text-white border-filaZero-blue" 
                          : "border-filaZero-gray text-gray-700 hover:bg-filaZero-lightBlue"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
              </div>
            </div>
          )}
          
          <div className="fixed bottom-20 md:relative md:bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:shadow-none z-10">
            <div className="flex space-x-3 container mx-auto">
              <button 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-filaZero-lightBlue"
                onClick={() => window.location.href = `tel:${provider.phone.replace(/\D/g, '')}`}
              >
                <Phone className="h-5 w-5 text-filaZero-blue" />
              </button>
              <button 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-filaZero-lightBlue"
                onClick={() => {
                  const whatsappUrl = `https://wa.me/${provider.phone.replace(/\D/g, '')}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                <MessageCircle className="h-5 w-5 text-filaZero-blue" />
              </button>
              <button
                className={`flex-1 btn-primary ${(!selectedDate || !selectedTime) ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!selectedDate || !selectedTime}
                onClick={handleSchedule}
              >
                Agendar
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default ServiceProvider;
