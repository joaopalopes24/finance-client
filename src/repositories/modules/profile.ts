// ** Internal Imports
import AxiosFactory from "@/repositories/factory";

type UpdateProfileProps = {
  name: string;
  email: string;
};

type UpdatePasswordProps = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

class ProfileModule extends AxiosFactory {
  async updateProfile(values: UpdateProfileProps) {
    await this.csrf();

    return this.$axios.put("/api/profile", values);
  }

  async updatePassword(values: UpdatePasswordProps) {
    await this.csrf();

    return this.$axios.patch("/api/profile/password", values);
  }

  async destroyAccount() {
    await this.csrf();

    return this.$axios.delete("/api/profile");
  }
}

export default ProfileModule;
