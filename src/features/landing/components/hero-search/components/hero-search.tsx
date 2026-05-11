'use client';

import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/utils/cn';

import { EmptyState, MovieItem, PanelFooter, SearchInput, TagFilter } from '.';
import { useHeroSearch } from '../hooks/use-hero-search';
import {
  LIST_MAX_HEIGHT,
  MOTION_DROPDOWN,
  MOTION_ITEM,
  QUICK_TAGS,
} from '../types';

export function HeroSearch() {
  const {
    containerRef,
    inputRef,
    listRef,
    searchQuery,
    setSearchQuery,
    selectedTag,
    selectedIndex,
    setSelectedIndex,
    isOpen,
    setIsOpen,
    panelState,
    emptyMessage,
    displayMovies,
    groupLabel,
    handleTagChange,
    handleSelect,
  } = useHeroSearch();

  const hasQuery = searchQuery.trim().length > 0;

  function handleClear() {
    setSearchQuery('');
    inputRef.current?.focus();
  }

  function handleFocus() {
    setIsOpen(true);
  }

  const showResults = panelState === 'results';
  const showEmpty = panelState === 'empty' || (panelState === 'initial' && hasQuery);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <div
        className={cn(
          'overflow-hidden rounded-2xl border border-border bg-background/80',
          'shadow-sm ring-1 ring-black/5 dark:ring-white/10',
          'transition-all duration-200',
          isOpen
            ? 'ring-2 ring-ring/50 focus-within:ring-2 focus-within:ring-ring/60'
            : 'hover:border-border/80',
        )}
      >
        <SearchInput
          inputRef={inputRef}
          value={searchQuery}
          onChange={setSearchQuery}
          onFocus={handleFocus}
          onClear={handleClear}
          hasValue={hasQuery}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...MOTION_DROPDOWN}
            className={cn(
              'absolute left-0 right-0 top-full z-50 mt-2',
              'overflow-hidden rounded-2xl border border-border',
              'bg-background/60 backdrop-blur-md',
              'shadow-xl ring-1 ring-black/5 dark:ring-white/10',
            )}
          >
            <div className="px-1 pt-2">
              <TagFilter
                tags={QUICK_TAGS}
                selectedTag={selectedTag}
                onTagChange={handleTagChange}
              />
            </div>

            <div className="h-px bg-border/40" />

            <div
              ref={listRef}
              role="listbox"
              aria-label="Movie results"
              className="overflow-y-auto py-1"
              style={{
                maxHeight: LIST_MAX_HEIGHT,
                scrollbarWidth: 'thin',
                scrollbarColor: 'oklch(0.5 0 0 / 0.12) transparent',
              }}
            >
              <style>{`
                [data-hero-panel]::-webkit-scrollbar {
                  width: 4px;
                }
                [data-hero-panel]::-webkit-scrollbar-track {
                  background: transparent;
                }
                [data-hero-panel]::-webkit-scrollbar-thumb {
                  background: oklch(0.5 0 0 / 0.12);
                  border-radius: 9999px;
                }
              `}</style>

              <AnimatePresence mode="popLayout">
                {showResults && (
                  <motion.div {...MOTION_ITEM} data-hero-panel>
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {groupLabel}
                      </span>
                    </div>

                    <div className="px-1 pb-1">
                      {displayMovies.map((movie, i) => (
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                          index={i}
                          selectedIndex={selectedIndex}
                          onSelect={handleSelect}
                          onHover={setSelectedIndex}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showEmpty && (
                  <EmptyState
                    title={emptyMessage.title}
                    subtitle={emptyMessage.subtitle}
                  />
                )}
              </AnimatePresence>
            </div>

            <PanelFooter
              panelState={panelState}
              movieCount={displayMovies.length}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
