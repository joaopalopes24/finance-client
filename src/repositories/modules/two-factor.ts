// ** Internal Imports
import AxiosFactory from "@/repositories/factory";

type ConfirmProps = {
  code: string;
};

class TwoFactorModule extends AxiosFactory {
  async enable() {
    await this.csrf();

    return this.$axios.post("/api/two-factor/enable");
  }

  async confirm(values: ConfirmProps) {
    await this.csrf();

    return this.$axios.post("/api/two-factor/confirm", values);
  }

  async destroy() {
    await this.csrf();

    return this.$axios.delete("/api/two-factor/destroy");
  }

  async qrCode() {
    await this.csrf();

    return this.$axios.get("/api/two-factor/qr-code");
  }

  async secretKey() {
    await this.csrf();

    return this.$axios.get("/api/two-factor/secret-key");
  }

  async recoveryCodes() {
    await this.csrf();

    return this.$axios.get("/api/two-factor/recovery-codes");
  }

  async newRecoveryCodes() {
    await this.csrf();

    return this.$axios.post("/api/two-factor/recovery-codes");
  }
}

export default TwoFactorModule;
