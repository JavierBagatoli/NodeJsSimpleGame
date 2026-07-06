import { auth } from "../../firebase";

export async function verifyFirebaseToken(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token no proporcionado",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
}


