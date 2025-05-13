
import { useState } from "react";
import { User, Calendar, Settings, LogOut, Edit } from "lucide-react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import AppointmentCard from "../components/AppointmentCard";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  
  // Mock data
  const user = {
    name: "Maria Silva",
    email: "maria.silva@example.com",
    phone: "(11) 98765-4321",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop"
  };
  
  const upcomingAppointments = [
    {
      id: "1",
      providerName: "Dra. Ana Silveira",
      serviceName: "Consulta de rotina",
      date: "14/05/2024",
      time: "09:00",
      status: "upcoming" as const,
      providerImageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "2",
      providerName: "Salão Beleza Pura",
      serviceName: "Corte de cabelo",
      date: "20/05/2024",
      time: "14:30",
      status: "upcoming" as const,
      providerImageUrl: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=300&auto=format&fit=crop"
    },
  ];
  
  const pastAppointments = [
    {
      id: "3",
      providerName: "Dr. Carlos Mendes",
      serviceName: "Consulta dermatológica",
      date: "05/05/2024",
      time: "10:00",
      status: "completed" as const,
      providerImageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "4",
      providerName: "Cartório 5º Ofício",
      serviceName: "Reconhecimento de firma",
      date: "28/04/2024",
      time: "15:00",
      status: "completed" as const,
      providerImageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "5",
      providerName: "Despachante Rápido",
      serviceName: "Transferência de veículo",
      date: "15/04/2024",
      time: "11:30",
      status: "canceled" as const,
      providerImageUrl: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=300&auto=format&fit=crop"
    },
  ];

  return (
    <div className="pb-16 md:pb-0 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
        
        <div className="card mb-6">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-20 h-20 mr-4">
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <button className="absolute bottom-0 right-4 bg-filaZero-blue p-1 rounded-full">
                <Edit className="h-4 w-4 text-white" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-filaZero-darkGray">{user.email}</p>
              <p className="text-sm text-filaZero-darkGray">{user.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="card flex flex-col items-center justify-center py-4">
            <User className="h-6 w-6 mb-2 text-filaZero-blue" />
            <span className="text-sm">Dados Pessoais</span>
          </button>
          <button className="card flex flex-col items-center justify-center py-4">
            <Calendar className="h-6 w-6 mb-2 text-filaZero-blue" />
            <span className="text-sm">Meus Agendamentos</span>
          </button>
          <button className="card flex flex-col items-center justify-center py-4">
            <Settings className="h-6 w-6 mb-2 text-filaZero-blue" />
            <span className="text-sm">Configurações</span>
          </button>
          <button className="card flex flex-col items-center justify-center py-4">
            <LogOut className="h-6 w-6 mb-2 text-filaZero-blue" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex border-b mb-4">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "upcoming"
                  ? "text-filaZero-blue border-b-2 border-filaZero-blue"
                  : "text-filaZero-darkGray"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Próximos
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "past"
                  ? "text-filaZero-blue border-b-2 border-filaZero-blue"
                  : "text-filaZero-darkGray"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Histórico
            </button>
          </div>
          
          {activeTab === "upcoming" ? (
            <div>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    id={appointment.id}
                    providerName={appointment.providerName}
                    serviceName={appointment.serviceName}
                    date={appointment.date}
                    time={appointment.time}
                    status={appointment.status}
                    providerImageUrl={appointment.providerImageUrl}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-filaZero-darkGray">Você não tem agendamentos futuros.</p>
                  <button className="btn-primary mt-4">Agendar Agora</button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  id={appointment.id}
                  providerName={appointment.providerName}
                  serviceName={appointment.serviceName}
                  date={appointment.date}
                  time={appointment.time}
                  status={appointment.status}
                  providerImageUrl={appointment.providerImageUrl}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default UserProfile;
