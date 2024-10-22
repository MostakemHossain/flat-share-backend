import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { bookingRoutes } from "../modules/booking/booking.routes";
import { contactRoutes } from "../modules/contact/contact.routes";
import { flatRoutes } from "../modules/flats/flat.routes";
import { teamRoutes } from "../modules/team/team.routes";
import { userRoutes } from "../modules/user/user.routes";
import { reviewRoutes } from "../modules/reviews/review.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/contact",
    route: contactRoutes,
  },
  {
    path: "/flats",
    route: flatRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
  {
    path: "/teams",
    route: teamRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
