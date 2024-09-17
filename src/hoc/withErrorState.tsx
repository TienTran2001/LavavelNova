function withErrorState(
  Component: React.ComponentType<{ reload: () => void }>
) {
  return (props: { reload: () => void }) => {
    return <Component reload={props.reload} />;
  };
}

export default withErrorState;
