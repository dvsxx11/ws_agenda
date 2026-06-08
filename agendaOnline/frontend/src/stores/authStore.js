import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async login(email, password) {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        })

      if (error) throw error

      this.user = data.user
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },

    async carregarUsuario() {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      this.user = user
    }
  }
})