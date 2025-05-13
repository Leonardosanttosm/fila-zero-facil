
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface AppointmentCardProps {
  id: string;
  providerName: string;
  serviceName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "canceled";
  providerImageUrl: string;
}

const AppointmentCard = ({
  id,
  providerName,
  serviceName,
  date,
  time,
  status,
  providerImageUrl,
}: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Agendado";
      case "completed":
        return "Concluído";
      case "canceled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div className="card mb-4">
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 mr-3">
          <img
            src={providerImageUrl}
            alt={providerName}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h3 className="font-semibold">{providerName}</h3>
          <p className="text-sm text-filaZero-darkGray">{serviceName}</p>
        </div>
        <div className="ml-auto">
          <span
            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`}
          >
            {getStatusText(status)}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm mb-4">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1 text-filaZero-darkGray" />
          <span>{date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-filaZero-darkGray" />
          <span>{time}</span>
        </div>
      </div>
      {status === "upcoming" && (
        <div className="flex space-x-2">
          <Link
            to={`/reschedule/${id}`}
            className="btn-secondary flex-1 text-center text-sm"
          >
            Reagendar
          </Link>
          <Link
            to={`/appointment/${id}`}
            className="btn-primary flex-1 text-center text-sm"
          >
            Detalhes
          </Link>
        </div>
      )}
      {status === "completed" && (
        <Link
          to={`/provider/${id.split("-")[0]}`}
          className="btn-primary w-full text-center text-sm"
        >
          Agendar Novamente
        </Link>
      )}
    </div>
  );
};

export default AppointmentCard;
