//Object page for loging in
    import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://raider-test-site.onrender.com/');
    await this.page.getByRole('link', { name: 'Login or register' }).click();
  }

  async login(username: string, password: string) {
    await this.page.getByLabel('Login name').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  
  get errorMessage() {
  return this.page.getByText(/error|incorrect|invalid/i);
}
}