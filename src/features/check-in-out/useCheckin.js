import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isCheckIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`the booking ${data.id} successfully checkin`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (data) =>
      toast.success(`the booking ${data.id} failed to checkin`),
  });
  return { checkIn, isCheckIn };
}
