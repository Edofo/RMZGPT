import userRepository from "@/interfaces/repositories/UserRepository";

export default class GetMeUseCase {
  async execute(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  }
}
