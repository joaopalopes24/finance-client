// ** Internal Imports
import AxiosFactory from "@/repositories/factory";

type ConfirmTwoFactorProps = {
  code: string;
};

class TwoFactorModule extends AxiosFactory {
  async enableTwoFactor() {
    await this.csrf();

    return this.$axios.post("/api/two-factor/enable");
  }

  async confirmTwoFactor(values: ConfirmTwoFactorProps) {
    await this.csrf();

    return this.$axios.post("/api/two-factor/confirm", values);
  }

  async destroyTwoFactor() {
    await this.csrf();

    return this.$axios.delete("/api/two-factor/destroy");
  }

  async qrCodeTwoFactor() {
    await this.csrf();

    return this.$axios.get("/api/two-factor/qr-code");
  }

  async secretKeyTwoFactor() {
    await this.csrf();

    return this.$axios.get("/api/two-factor/secret-key");
  }

  async recoveryCodesTwoFactor() {
    await this.csrf();

    return this.$axios.get("/api/two-factor/recovery-codes");
  }

  async newRecoveryCodesTwoFactor() {
    await this.csrf();

    return this.$axios.post("/api/two-factor/recovery-codes");
  }
}

export default TwoFactorModule;
