
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, User, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

type Service = {
  id: string;
  name: string;
  duration: string;
  price: string;
};

type Provider = {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
};

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock data
  const provider: Provider = {
    id: id || "1",
    name: "Dra. Ana Silveira",
    specialty: "Clínico Geral",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
  };
  
  const services: Service[] = [
    { id: "s1", name: "Consulta de rotina", duration: "30 min", price: "R$ 250,00" },
    { id: "s2", name: "Check-up completo", duration: "60 min", price: "R$ 450,00" },
    { id: "s3", name: "Retorno", duration: "20 min", price: "R$ 150,00" },
  ];
  
  const dates = [
    { date: "2024-05-14", label: "Hoje", available: true },
    { date: "2024-05-15", label: "Amanhã", available: true },
    { date: "2024-05-16", label: "16/05", available: true },
    { date: "2024-05-17", label: "17/05", available: true },
    { date: "2024-05-18", label: "18/05", available: true },
  ];
  
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) return;
    
    // Aqui você enviaria os dados do agendamento para a API
    console.log("Booking submitted:", {
      providerId: id,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      notes
    });
    
    // Redirecionar para a página de confirmação
    navigate("/booking/confirmation");
  };

  return (
    <div className="pb-16 md:pb-0 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to={`/provider/${id}`} className="mr-2">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Agendar</h1>
        </div>
        
        <div className="card mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 mr-4">
              <img
                src={provider.imageUrl}
                alt={provider.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{provider.name}</h2>
              <p className="text-sm text-filaZero-darkGray">{provider.specialty}</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Selecione o serviço
            </h2>
            <div className="space-y-3">
              {services.map(service => (
                <div
                  key={service.id}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedService === service.id
                      ? "border-filaZero-blue bg-filaZero-lightBlue"
                      : "border-filaZero-gray"
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-filaZero-darkGray">{service.duration}</p>
                    </div>
                    <span className="font-semibold">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Selecione a data
            </h2>
            <div className="flex space-x-3 overflow-x-auto py-2 -mx-4 px-4">
              {dates.map(date => (
                <button
                  type="button"
                  key={date.date}
                  className={`px-4 py-2 rounded-lg min-w-[80px] ${
                    selectedDate === date.date
                      ? "bg-filaZero-blue text-white"
                      : "bg-filaZero-gray text-gray-700"
                  } ${!date.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => date.available && setSelectedDate(date.date)}
                  disabled={!date.available}
                >
                  <span>{date.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {selectedDate && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Selecione o horário
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                  <button
                    type="button"
                    key={time}
                    className={`py-2 rounded-lg border text-center ${
                      selectedTime === time
                        ? "bg-filaZero-blue text-white border-filaZero-blue"
                        : "border-filaZero-gray text-gray-700"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Observações (opcional)
            </h2>
            <textarea
              className="input-field min-h-[100px]"
              placeholder="Alguma informação adicional que o prestador deva saber?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className={`btn-primary w-full ${
              !selectedService || !selectedDate || !selectedTime
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!selectedService || !selectedDate || !selectedTime}
          >
            Confirmar Agendamento
          </button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
};

export default Booking;
