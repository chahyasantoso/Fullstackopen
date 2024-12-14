const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'chahya',
        password: 'secretpassword',
        name: 'chahya santoso',

      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'chahya', 'secretpassword')
      await expect(page.getByText('chahya santoso logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'chahya', 'wrongpassword')
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await login(page, 'chahya', 'secretpassword')
      const blog = {
        title: 'blog 1',
        author: 'chahya',
        url: 'xxx',
      }
      await createBlog(page, blog)
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText(`a new blog ${blog.title} by ${blog.author}`)).toBeVisible()
    })

    test('a new blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'Like' }).click()

      const blogDiv = page.locator('.item').getByText('blog 1')
      await expect(blogDiv).toContainText('Likes 1')
    })

    test('a new blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).click()
      const buttonRemove = page.getByRole('button', { name: 'Remove' })
      expect(buttonRemove).toBeVisible()

      page.on('dialog', dialog => dialog.accept());
      await buttonRemove.click()

      const blogDiv = page.locator('.item').getByText('blog 1')
      await expect(blogDiv).not.toBeVisible()
    })

    test('blogs are arranged in the order according to the likes with blogs with the most likes first', async ({ page }) => {
      await createBlog(page, { title: 'blog 2', author: 'chahya', url: 'yyy' })

      const blog2Div = page.locator('.item').getByText('blog 2')
      await blog2Div.getByRole('button', { name: 'View' }).click()
      await blog2Div.getByRole('button', { name: 'Like' }).click()

      await page.locator('.item').getByText('blog 2').getByText('Likes 1').waitFor({ timeout: 5000 })

      const items = await page.locator('.item').all()
      await expect(items[0]).toContainText('blog 2')
      await expect(items[1]).toContainText('blog 1')
    })
  })

  describe('When logged in with different user', () => {
    beforeEach(async ({ page, request }) => {
      //create blog with first user
      await login(page, 'chahya', 'secretpassword')
      const blog = {
        title: 'blog 1',
        author: 'chahya',
        url: 'xxx',
      }
      await createBlog(page, blog)
      await page.getByRole('button', { name: 'Logout' }).click()

      //create second user
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'adicandra',
          password: 'secretpassword',
          name: 'adi candra',
        }
      })
      await login(page, 'adicandra', 'secretpassword')
    })

    test('blog that is not created the by the logged in user can not be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).click()

      const buttonRemove = page.getByRole('button', { name: 'Remove' })
      expect(buttonRemove).not.toBeVisible()
    })
  })


})