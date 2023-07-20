import React from "react";
import Icon from "src/components/Icon";
import ArrowBack from "assets/svg-icon/arrow-left.svg";
import { Container, Stack } from "src/components/Layout";
import CustomPressable from "src/components/CustomPressable";
import { Text } from "src/components/Text";
import { HeaderContainer } from "src/components/Header/styled";

type Props = {
  cancelAction: () => void;
  deleteAction: () => Promise<void>;
  selectAllAction: () => void;
};

const DeleteHeader = ({
  cancelAction,
  deleteAction,
  selectAllAction,
}: Props) => {
  return (
    <Container>
      <HeaderContainer>
        <CustomPressable onPress={cancelAction}>
          <Icon icon={ArrowBack} type="fill" />
        </CustomPressable>

        <Stack direction="row" gap={16}>
          <CustomPressable onPress={selectAllAction}>
            <Text size="FONT_2XS" weight="WEIGHT_MEDIUM">
              Selecionar Todos
            </Text>
          </CustomPressable>

          <CustomPressable onPress={deleteAction}>
            <Text size="FONT_2XS" weight="WEIGHT_MEDIUM">
              Apagar
            </Text>
          </CustomPressable>
        </Stack>
      </HeaderContainer>
    </Container>
  );
};

export default DeleteHeader;
