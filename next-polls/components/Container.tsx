interface Props{}

const Container: React.FC<Props> = props => {
  return (
    <>
        <div className="max-w-3xl mx-auto">
        <div className="mx-1  items-center">
          {props.children}
        </div>
        </div>
    </>
  )
}

export default Container;