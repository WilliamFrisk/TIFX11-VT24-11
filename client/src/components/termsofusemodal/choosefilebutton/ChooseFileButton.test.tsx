import { act, fireEvent, render } from "@testing-library/react";
import ChooseFileButton from "./ChooseFileButton";

describe("ChooseFileButton", () => {
  test("changes button text when a file is selected", () => {
    const onFileSelectedMock = jest.fn();

    const { getByTestId } = render(
      <ChooseFileButton onFileSelected={onFileSelectedMock} />
    );

    const chooseFileButton = getByTestId("button-element");
    const fileInput = getByTestId("input-element");

    expect(chooseFileButton).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();

    act(() => {
      // Simulate file selection
      fireEvent.change(fileInput, {
        target: {
          files: [new File([""], "test.mp4", { type: "video/mp4" })],
        },
      });
    });

    // Verify that the button text changes after file selection
    expect(chooseFileButton).toHaveTextContent("test.mp4");
    expect(onFileSelectedMock).toHaveBeenCalledTimes(1);
  });
});
