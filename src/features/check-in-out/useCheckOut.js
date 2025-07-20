import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isCheckOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`the booking ${data.id} successfully checkOut`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (data) =>
      toast.success(`the booking ${data.id} failed to checkOut`),
  });
  return { checkOut, isCheckOut };
}
