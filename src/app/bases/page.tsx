'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'motion/react';
import { PacmanLoader } from 'react-spinners';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { FullBase } from '@/types';
import getBases from '@/actions/getBases';
import BaseItem from './components/BaseItem';
import AddBaseModal from './components/AddBaseModal';
import { types } from '@/data/types';
import SelectComponent from '@/app/bases/components/Select';

type TownHall = {
  value: string;
  name: string;
};

type Type = {
  value: string;
  name: string;
};

export default function BasesPage() {
  const [selectedTownHall, setSelectedTownHall] = useState<TownHall>({
    value: '',
    name: '',
  });
  const [selectedType, setSelectedType] = useState<Type>({
    value: '',
    name: '',
  });
  const [bases, setBases] = useState<FullBase[]>([]);
  const [filteredBases, setFilteredBases] = useState<FullBase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBases = async () => {
      const fetchedBases = await getBases();
      setBases(fetchedBases);
      setFilteredBases(fetchedBases);
      setLoading(false);
    };
    fetchBases();
  }, []);

  useEffect(() => {
    const filterBases = () => {
      let filtered = bases;
      if (selectedTownHall.value) {
        filtered = filtered.filter(
          (base) => base.townHall === selectedTownHall.value
        );
      }
      if (selectedType.value) {
        filtered = filtered.filter((base) =>
          base.type.includes(selectedType.value)
        );
      }
      if (searchTerm) {
        filtered = filtered.filter(
          (base) =>
            base.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (base.description?.toLowerCase() ?? '').includes(
              searchTerm.toLowerCase()
            )
        );
      }
      setFilteredBases(filtered);
    };
    filterBases();
  }, [selectedTownHall, selectedType, bases, searchTerm]);

  const handleAddBase = (newBase: FullBase) => {
    setBases((prevBases) => [newBase, ...prevBases]);
    setFilteredBases((prevBases) => [newBase, ...prevBases]);
  };

  return (
    <div className="h-[calc(100vh-50px)] bg-gradient-to-br from-primary/10 to-secondary/10">
      <AddBaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} onAddBase={handleAddBase} />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary">Base Designs</h1>
            {session && (
              <Button onClick={() => setIsOpen(true)}>Add Base</Button>
            )}
          </div>
        </motion.div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <SelectComponent
                onClick={(e) => {
                  setSelectedTownHall({ value: e.value, name: e.name });
                }}
                placeholder="Town Hall Filter"
              />
              <Select
                onValueChange={(value) =>
                  setSelectedType({ value, name: value })
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Base Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.id} value={type.value}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Search bases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-auto"
              />
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredBases.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p>No bases found for current filters</p>
          </div>
        ) : (
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="grid">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBases.map((base) => (
                  <BaseItem key={base.id} base={base} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="list">
              <ScrollArea className="h-[600px] rounded-md border p-4">
                {filteredBases.map((base) => (
                  <BaseItem key={base.id} base={base} listView />
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}