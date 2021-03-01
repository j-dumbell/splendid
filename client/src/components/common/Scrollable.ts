import styled from "styled-components";

type Props = {
  maxHeight?: string;
};

const Scrollable = styled.div`
  max-height: ${(props: Props) =>
    props.maxHeight ? props.maxHeight : "500px"};
  overflow-x: scroll;
  padding: 5px;
  background-color: #494945;
`;

export default Scrollable;
