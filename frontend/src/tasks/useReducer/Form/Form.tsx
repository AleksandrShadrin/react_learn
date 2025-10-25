import { type ReactElement, useReducer } from 'react';

type UserDto = {
  name: string;
  email: string;
};

type UpdateAction =
  | { type: 'EMAIL'; email: string }
  | { type: 'NAME'; name: string };

function userReducer(state: UserDto, action: UpdateAction) {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.email };
    case 'NAME':
      return { ...state, name: action.name };
    default:
      throw new Error('unreachable code');
  }
}

export default function Form(): ReactElement {
  const [user, userDispatcher] = useReducer(userReducer, {
    name: '',
    email: '',
  });

  return (
    <form>
      <label>
        name
        <input
          type='text'
          minLength={1}
          value={user.name}
          onChange={e => userDispatcher({ type: 'NAME', name: e.target.value })}
        />
      </label>
      <label>
        email
        <input
          type='text'
          minLength={1}
          value={user.email}
          onChange={e =>
            userDispatcher({ type: 'EMAIL', email: e.target.value })
          }
        />
      </label>
    </form>
  );
}
