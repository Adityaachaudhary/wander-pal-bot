import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

interface HeaderProps {
  onSearchSubmit?: (query: string) => void;
}

const Header = ({ onSearchSubmit }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(searchQuery);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <header className="bg-card border-b travel-shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-xl font-bold text-primary hover:text-primary-glow travel-transition"
            >
              TravelEase
            </button>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search destinations, hotels, or attractions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-border focus:border-primary travel-transition"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate('/trips')}
              className="text-foreground hover:text-primary travel-transition font-medium"
            >
              Trips
            </button>
            <button
              onClick={() => navigate('/hotels')}
              className="text-foreground hover:text-primary travel-transition font-medium"
            >
              Hotels
            </button>
            <button
              onClick={() => navigate('/attractions')}
              className="text-foreground hover:text-primary travel-transition font-medium"
            >
              Places
            </button>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  navigate('/trips');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded travel-transition"
              >
                Trips
              </button>
              <button
                onClick={() => {
                  navigate('/hotels');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded travel-transition"
              >
                Hotels
              </button>
              <button
                onClick={() => {
                  navigate('/attractions');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded travel-transition"
              >
                Places to Visit
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;