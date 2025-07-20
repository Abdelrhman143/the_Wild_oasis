import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("successfully delete the booking");
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
    onError: () => toast.error("faild to delete the booking"),
  });

  return { isDeletingBooking, deleteBooking };
}
