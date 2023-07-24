import { phs, pvs } from "src/utils/metrics";
import styled from "styled-components/native";
import { ChapterListBadgeProps } from "./ChapterListBadge";

type StatusChapter = {
  lastRead?: boolean;
  read?: boolean;
};

export const ChapterBadgeBox = styled.Pressable.attrs({
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
})<StatusChapter>`
  background-color: ${({ theme, read, lastRead }) =>
    read ? theme.CHAPTER_READ : lastRead ? theme.PRIMARY : "transparent"};
  border-radius: 4px;
  border: 1px solid
    ${({ theme, read, lastRead }) =>
      lastRead || read ? "transparent" : theme.DARK_700};
  align-items: center;
  width: ${phs(54)};
  height: ${pvs(33)};
`;
export const ChapterBadgeText = styled.Text<StatusChapter>`
  font-size: ${(props) => props.theme.FONT_4XS};
  color: ${(props) =>
    props.lastRead ? props.theme.WHITE : props.theme.TEXT_COLOR};
  font-family: ${(props) => props.theme.WEIGHT_MEDIUM};
`;

export const ChapterCount = styled.View`
  background-color: ${(props) => props.theme.WARNING};
  padding: 4px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 4px;
  width: ${phs(120)};
  height: ${pvs(30)};
`;

export const LastReadButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  background-color: ${(props) => props.theme.PRIMARY};
  border-radius: 8px;
  padding: 6px 8px;
`;
