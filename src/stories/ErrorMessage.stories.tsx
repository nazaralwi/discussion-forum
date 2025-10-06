import ErrorMessage from '../components/ErrorMessage';

const stories = {
  title: 'ErrorMessage',
  component: ErrorMessage,
};

export default stories;

const WithMessage = (args: { message: string }) => <ErrorMessage {...args} />;

WithMessage.args = {
  message: 'Connection failed',
};

export { WithMessage };
