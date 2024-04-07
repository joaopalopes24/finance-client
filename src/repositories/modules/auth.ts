// ** Internal Imports
import AxiosFactory from "@/repositories/factory";

type ConfirmPasswordProps = {
  password: string;
};

type LoginProps = {
  email: string;
  password: string;
  remember: boolean;
};

type RegisterProps = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type ResetPasswordProps = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type TwoFactorProps = {
  recover: boolean;
  code: string;
  recovery_code: string;
};

class AuthModule extends AxiosFactory {
  async login(values: LoginProps) {
    await this.csrf();

    return this.$axios.post("/login", values);
  }

  async register(values: RegisterProps) {
    await this.csrf();

    return await this.$axios.post("/register", values);
  }

  async forgotPassword(values: { email: string }) {
    await this.csrf();

    return await this.$axios.post("/forgot-password", values);
  }

  async resetPassword(values: ResetPasswordProps) {
    await this.csrf();

    return await this.$axios.patch("/reset-password", values);
  }

  async twoFactor(values: TwoFactorProps) {
    await this.csrf();

    return await this.$axios.post("/two-factor", values);
  }

  async logout() {
    await this.csrf();

    return this.$axios.delete("/logout");
  }

  async confirmedStatus() {
    await this.csrf();

    return this.$axios.get("/confirmed-status");
  }

  async confirmPassword(values: ConfirmPasswordProps) {
    await this.csrf();

    return this.$axios.post("/confirm-password", values);
  }

  async emailVerification() {
    await this.csrf();

    return this.$axios.post("/email/new-notification");
  }

  async me() {
    await this.csrf();

    return await this.$axios.get("/api/me");
  }
}

export default AuthModule;
