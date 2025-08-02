interface IHeadingProps {
  text: string
}

const Heading = ({ text }: IHeadingProps) => {
  return <h1 className="my-6 text-3xl font-bold text-primaryColor">{text}</h1>
}

export default Heading
