import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VisitCard from '.';
import visitsJson from '../../mocks/visits.json';

const [visit] = visitsJson;

describe('Visit Cars', () => {
  it('works', () => {
    expect(true).toBe(true);
    render(<VisitCard visit={visit} />);
    screen.debug();
    expect(screen.queryByText("mostlyfocused.com")).toBeInTheDocument() // you need setupTests.ts and types/testing-library__jest-dom" for this matcher
  })
});
