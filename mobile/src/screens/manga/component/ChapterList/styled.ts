import { phs, pvs } from "src/utils/metrics";
import styled from "styled-components/native";
import { ChapterListBadgeProps } from "./ChapterListBadge";

export const ChapterBadgeBox = styled.Pressable.attrs({
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
})<Pick<ChapterListBadgeProps, "lastRead" | "read">>`
  background-color: ${({ theme, read, lastRead }) =>
    read ? theme.CHAPTER_READ : lastRead ? theme.PRIMARY : "transparent"};
  padding: ${pvs(8)} 0;
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.lastRead ? "transparent" : props.theme.DARK_700)};
  align-items: center;
  width: ${phs(54)};
`;
export const ChapterBadgeText = styled.Text<
  Pick<ChapterListBadgeProps, "lastRead">
>`
  font-size: ${(props) => props.theme.FONT_4XS};
  color: ${(props) =>
    props.lastRead ? props.theme.WHITE : props.theme.TEXT_COLOR};
  font-family: ${(props) => props.theme.WEIGHT_MEDIUM};
`;

export const ChapterCount = styled.View`
  background-color: ${(props) => props.theme.PRIMARY};
  padding: 4px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 4px;
  width: ${phs(120)};
`;
