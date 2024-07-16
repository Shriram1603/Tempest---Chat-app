import { create } from 'zustand';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isRecieverBlocked: false,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // Check if current user is blocked
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isRecieverBlocked: false,
      });
    }

    // Check if receiver is blocked
    if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isRecieverBlocked: true,
      });
    }

    return set({
      chatId,
      user: user,
      isCurrentUserBlocked: false,
      isRecieverBlocked: false,
    });
  },

  changeBlock: () => {
    set((state) => ({ ...state, isRecieverBlocked: !state.isRecieverBlocked }));
  }
}));
